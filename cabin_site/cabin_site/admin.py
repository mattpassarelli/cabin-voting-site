from django.contrib import admin
from .models import Trip

class TripAdmin(admin.ModelAdmin):
    list_display = ('year', 'start_date', 'end_date', 'date_created', 'last_modified')

# Register your models here.

admin.site.register(Trip, TripAdmin)