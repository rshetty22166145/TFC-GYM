# Generated by Django 4.1.3 on 2022-11-13 07:12

from django.db import migrations
import recurrence.fields


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='recurrences',
            field=recurrence.fields.RecurrenceField(blank=True, null=True),
        ),
    ]