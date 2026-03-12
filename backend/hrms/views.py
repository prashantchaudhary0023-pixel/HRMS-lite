from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Employee, Attendance
from .serializers import (
    EmployeeSerializer,
    EmployeeDetailSerializer,
    AttendanceSerializer
)


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing employees
    Provides list, create, retrieve, update, and delete operations
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['employee_id', 'full_name', 'email', 'department']
    ordering_fields = ['created_at', 'full_name', 'employee_id']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """Use detailed serializer for retrieve action"""
        if self.action == 'retrieve':
            return EmployeeDetailSerializer
        return EmployeeSerializer

    def create(self, request, *args, **kwargs):
        """Create a new employee with validation"""
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """Delete an employee"""
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {'message': 'Employee deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['get'])
    def attendance_summary(self, request, pk=None):
        """Get attendance summary for a specific employee"""
        employee = self.get_object()
        attendance_records = employee.attendance_records.all()

        total_records = attendance_records.count()
        present_days = attendance_records.filter(status='present').count()
        absent_days = attendance_records.filter(status='absent').count()

        return Response({
            'employee_id': employee.employee_id,
            'full_name': employee.full_name,
            'total_records': total_records,
            'present_days': present_days,
            'absent_days': absent_days,
        })


class AttendanceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing attendance records
    Provides list, create, retrieve, update, and delete operations
    """
    queryset = Attendance.objects.select_related('employee').all()
    serializer_class = AttendanceSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['employee', 'date', 'status']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']

    def create(self, request, *args, **kwargs):
        """Mark attendance with validation"""
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def list(self, request, *args, **kwargs):
        """List attendance records with optional filtering"""
        queryset = self.filter_queryset(self.get_queryset())

        # Optional date range filtering
        date_from = request.query_params.get('date_from', None)
        date_to = request.query_params.get('date_to', None)

        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
