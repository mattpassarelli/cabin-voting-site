from django.db import models
from cabin_site.models import User, Trip


class Cabin(models.Model):
    state = models.CharField(max_length=2)
    city = models.CharField()
    things_to_do = models.TextField(blank=True, null=True)
    listing_url = models.URLField(max_length=1000)
    image_url = models.URLField(blank=True, max_length=1000)
    price = models.IntegerField()

    votes = models.ManyToManyField(User, related_name="votes", blank=True)
    submitter = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    trip = models.ForeignKey(Trip, related_name="cabins", on_delete=models.CASCADE)

    is_active = models.BooleanField(db_default=True)
