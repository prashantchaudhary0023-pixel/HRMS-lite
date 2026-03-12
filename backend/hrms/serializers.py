from rest_framework import serializers
from .models import Employee, Attendance
from django.core.validators import EmailValidator
import re


class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for Employee model with validation"""

    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_employee_id(self, value):
        """Validate employee_id format and uniqueness"""
        if not value or not value.strip():
            raise serializers.ValidationError("Employee ID is required")

        value = value.strip()

        # Check uniqueness on create
        if self.instance is None:
            if Employee.objects.filter(employee_id=value).exists():
                raise serializers.ValidationError("Employee ID already exists")

        return value

    def validate_full_name(self, value):
        """Validate full name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Full name is required")

        if len(value.strip()) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters")

        return value.strip()

    def validate_email(self, value):
        """Validate email format and uniqueness"""
        if not value:
            raise serializers.ValidationError("Email is required")

        value = value.lower().strip()

        # Email format validation
        email_validator = EmailValidator()
        try:
            email_validator(value)
        except:
            raise serializers.ValidationError("Enter a valid email address")

        # Check uniqueness on create
        if self.instance is None:
            if Employee.objects.filter(email=value).exists():
                raise serializers.ValidationError("Email already exists")

        return value

    def validate_department(self, value):
        """Validate department"""
        if not value or not value.strip():
            raise serializers.ValidationError("Department is required")

        return value.strip()


class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer for Attendance model"""
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id_display = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'employee_id_display', 'date', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_employee(self, value):
        """Validate employee exists"""
        if not value:
            raise serializers.ValidationError("Employee is required")
        return value

    def validate_date(self, value):
        """Validate date"""
        if not value:
            raise serializers.ValidationError("Date is required")
        return value

    def validate_status(self, value):
        """Validate status"""
        valid_statuses = ['present', 'absent']
        if value.lower() not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value.lower()

    def validate(self, data):
        """Validate unique constraint for employee and date"""
        employee = data.get('employee')
        date = data.get('date')

        if employee and date:
            # Check for duplicate attendance on update
            if self.instance:
                if Attendance.objects.filter(
                    employee=employee,
                    date=date
                ).exclude(id=self.instance.id).exists():
                    raise serializers.ValidationError(
                        "Attendance already marked for this employee on this date"
                    )
            # Check for duplicate attendance on create
            else:
                if Attendance.objects.filter(employee=employee, date=date).exists():
                    raise serializers.ValidationError(
                        "Attendance already marked for this employee on this date"
                    )

        return data


class EmployeeDetailSerializer(EmployeeSerializer):
    """Extended serializer with attendance records"""
    attendance_records = AttendanceSerializer(many=True, read_only=True)
    total_present_days = serializers.SerializerMethodField()

    class Meta(EmployeeSerializer.Meta):
        fields = EmployeeSerializer.Meta.fields + ['attendance_records', 'total_present_days']

    def get_total_present_days(self, obj):
        """Calculate total present days for employee"""
        return obj.attendance_records.filter(status='present').count()
