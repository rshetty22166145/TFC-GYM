from rest_framework import serializers

from classes.models import Class, Event


class ClassSerializer(serializers.ModelSerializer):

    classes = serializers.SerializerMethodField()

    def get_classes(self, obj):
        dictionary = {"id": obj.classes.id, "name": obj.classes.name, "coach": obj.classes.coach, "capacity": obj.classes.capacity}
        return dictionary

    class Meta:
        model = Event
        fields = ['id', 'classes', 'students', 'day', 'start_time', 'end_time']
