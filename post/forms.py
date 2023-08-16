from django import forms
from .models import Board

class BoardForm(forms.ModelForm):
    class Meta:
        model = Board # 이 폼이 사용할 모델은 Board입니다.
        fields = ['title', 'content', 'photo']  # 폼에 포함될 필드들을 지정합니다. 'title', 'content', 'photo'가 포함됩니다.
