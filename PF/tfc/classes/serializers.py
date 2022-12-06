from rest_framework import serializers

from classes.models import Class, Event


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['classes', 'students', 'day', 'start_time', 'end_time']
