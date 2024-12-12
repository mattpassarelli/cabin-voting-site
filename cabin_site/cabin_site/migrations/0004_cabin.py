# Generated by Django 5.0.9 on 2024-12-12 21:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabin_site", "0003_trip"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cabin",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("state", models.CharField(max_length=2)),
                ("city", models.CharField()),
                ("things_to_do", models.TextField(blank=True, null=True)),
                ("listing_url", models.URLField(max_length=1000)),
                ("image_url", models.URLField(blank=True, max_length=1000)),
                ("price", models.IntegerField(default=0)),
                (
                    "submitter",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "trip",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="trip",
                        to="cabin_site.trip",
                    ),
                ),
                (
                    "votes",
                    models.ManyToManyField(
                        blank=True, related_name="votes", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
    ]
