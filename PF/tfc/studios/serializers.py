from rest_framework import serializers

from studios.models import Studio


class GeoLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['id', 'name', 'geographical_location', 'amenities', 'classes', 'phone_number', 'postal_code']
