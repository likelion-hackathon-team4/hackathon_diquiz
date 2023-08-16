from django.shortcuts import render
def test(request):
 return render(request, 'account/registerpage.html')
# Create your views here.