# Generated by Django 3.2.20 on 2023-08-11 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('quiz_id', models.AutoField(db_column='quiz_id', primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=200)),
                ('reference', models.CharField(blank=True, max_length=200, null=True)),
                ('answer', models.BooleanField(default=False)),
                ('result', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'quiz',
            },
        ),
    ]
