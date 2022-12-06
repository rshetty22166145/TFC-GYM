# Generated by Django 4.1.3 on 2022-11-13 13:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('classes', '0012_remove_event_students_event_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='students',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL, verbose_name='Students'),
        ),
    ]