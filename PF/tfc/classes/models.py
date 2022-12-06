import recurrence.fields
from django.db import models
from django.db.models import SET_NULL
from geolocation_fields.models import fields

# Create your models here.
from rest_framework.exceptions import ValidationError

from accounts.models import UserProfile
from studios.models import Studio


class Class(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='classes')
    name = models.CharField(max_length=200)
    description = models.TextField()
    coach = models.CharField(max_length=200)
    capacity = models.PositiveIntegerField(null=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)
    recurrence = recurrence.fields.RecurrenceField(null=True, include_dtstart=True)

    def __str__(self):
        return self.name


class Keyword(models.Model):
    classes = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='keywords')
    keyword = models.CharField(max_length=200)


class Event(models.Model):
    classes = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='instances')
    day = models.DateField(u'Day of the event', help_text=u'Day of the event')
    start_time = models.TimeField(u'Starting time', help_text=u'Starting time')
    end_time = models.TimeField(u'Final time', help_text=u'Final time')
    students = models.ManyToManyField(UserProfile, verbose_name='Students', blank=True)
    cancel = models.BooleanField(default=False)

    class Meta:
        verbose_name = u'Scheduling'
        verbose_name_plural = u'Scheduling'

    def __str__(self):
        return f"{self.classes.name} {self.day} {self.start_time}-{self.end_time}"
