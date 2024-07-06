from django.db import models
from cabin_site.models.cabin import Cabin


class Trip(models.Model):
    year = models.IntegerField(blank=False, null=False, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    cabins = models.ManyToManyField(Cabin, blank=True)
