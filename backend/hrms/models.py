from django.db import models
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError


class Employee(models.Model):
    """Employee model with unique employee ID and basic information"""
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="Unique employee identifier"
    )
    full_name = models.CharField(max_length=100)
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()]
    )
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"

    def clean(self):
        """Custom validation"""
        if self.email:
            self.email = self.email.lower()


class Attendance(models.Model):
    """Attendance tracking for employees"""
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )
    date = models.DateField(db_index=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['employee', 'date']
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendance Records'
        indexes = [
            models.Index(fields=['employee', 'date']),
            models.Index(fields=['date']),
        ]

    def __str__(self):
        return f"{self.employee.employee_id} - {self.date} - {self.status}"

    def clean(self):
        """Validate attendance record"""
        if self.status not in dict(self.STATUS_CHOICES):
            raise ValidationError(f"Invalid status: {self.status}")
