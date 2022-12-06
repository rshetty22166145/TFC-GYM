from rest_framework import serializers

from studios.models import Studio


class GeoLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['name', 'geographical_location', 'amenities', 'classes']
