from llama_cpp import Llama
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import threading
import json
import time

def homepage(request):
#    return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'home.html')
def about(request):
#    return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'about.html')
def test(request):
#    return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'test.html')
llm = Llama (
model_path= "static\supply_depot\luna-ai-llama2-uncensored.Q6_K.gguf",
chat_format="llama-2",
n_gpu_layers=10, # Uncomment to use GPU acceleration
n_ctx=768, # Uncomment to increase the context window
)


@csrf_exempt
def process_text(request):
    data = json.loads(request.body)
    text = data.get('text')
    prompt_type = data.get('prompt_type')
    print("CHECKS")
    print(prompt_type)
    print(text)
    
    selected_prompt = "Continue the above story from where it was, slowing down the pacing and creating intense reflection and introspection."

    text = f"Content: {text} \n {prompt_type}"
    
    processed_text = process_text_function(text, prompt_type)
    
    return JsonResponse({'output': processed_text})
    

def process_text_function(text, prompt_type):
    returned_text = ''
    
    if prompt_type == 'summarize':
        prefix_prompt = 'Summarize the following content:'
        strung_together = f"{prefix_prompt} {text}"
    elif prompt_type == 'depict':
        prefix_prompt = 'Depict the following content. Parsing the literature into a series of words seperated commas, each comma dividing a couple words which are another visual element.'
        strung_together = f"{prefix_prompt} {text}"
    elif prompt_type == 'user_interaction':
        memory = ''
        prefix_prompt = ''
        suffix_prompt = ''
        strung_together = f"{prefix_prompt} {text}"
    else:
        print("Prompt is default")
    
    print("Beginning process_text_function")
    print(text)
    
    num_words = (len(text.split())  * 1.90)
    
    LLM_output = llm(text, # Prompt
    max_tokens=num_words, # Generate up to 32 tokens, set to None to generate up to the end of the context window
    stream=True)
    loops = num_words
    
    for item in LLM_output:
        loops -= 3
        bit = item['choices'][0]['text']
        returned_text += f"{bit}"
        if loops <= 0:
            print(returned_text)
            return returned_text
        



            