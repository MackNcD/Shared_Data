#from django.http import HttpResponse
import os
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
#    return HttpResponse("This is an app.")
    return render(request, 'about.html')
def test(request):
#    return HttpResponse("This is an app.")
    return render(request, 'test.html')

llm = Llama (
    model_path= "static\supply_depot\luna-ai-llama2-uncensored.Q6_K.gguf",
    chat_format="llama-2",
    n_gpu_layers=10, # Uncomment to use GPU acceleration
    # seed=1337, # Uncomment to set a specific seed
    n_ctx=768, # Uncomment to increase the context window
    )

@csrf_exempt
def process_text(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text')
            processed_text = process_text_function(text)
            return JsonResponse({'output': processed_text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)




step = 0
selected_text_global = ''
img_prompt = ''
'''
def process_text_function(text):
    global step, selected_text_global, img_prompt
    print("This is the beginning of the initiating function.")
    
    if step == 0:
        selected_text_global = text
        thread = threading.Thread(target=llm_function_start, args=text)
        thread.start()
        
    elif step == 1:
        print('Step 2, initiating function.')
        selected_text_global = f'{output1.get("1.0", "end")}'
        thread = threading.Thread(target=llm_function_start)
        thread.start()
    elif step == 2:
        print('Step 3, initiating function.')
        selected_text_global = f'{output2.get("1.0", "end")}'
        thread = threading.Thread(target=llm_function_start)
        thread.start()
    else:
        print("No text selected to start output, or output has just finished")
        step = 0
        print('Step:')
        print({step})
        
    image_thread = threading.Thread(target=llm_image_start())
    image_thread.start()
        
def llm_image_start():
    global img_prompt
    if step == 0:
        img_prompt = f'{selected_text_global}'
    elif step == 1:
        img_prompt = output1.get("1.0", "end")
    elif step == 2:
        img_prompt = output2.get("1.0", "end")
    elif step == 3:
        img_prompt = output3.get("1.0", "end")
    picture_function() #put another picture next to each talky bubble #needs a switch for on/off
    
def picture_function():
    global content, img_prompt
    character = ""
    get_image(img_prompt)
    get_image_thread = threading.Thread(target=get_image, args=(img_prompt))
    get_image_thread.start()
    '''
def process_text_function(text):
    global step, selected_text_global, img_prompt
    returned_text = ''
    selected_prompt = 'Rephrase this:'
    
    total_package = f"{selected_prompt} \n Content: {text}"
    print(total_package)
    '''
    memory = f'{notes_textbox.get("1.0", "end")}'
    input_prompt = f'{memory} {total_package}'
    context = main_text.get("1.0", "end")
    '''
    num_words = (len(text.split())  * 1.90)
    '''
    max_token_setting = int(max_token_slider.get())
    '''
    output = llm(selected_prompt, # Prompt
    max_tokens=num_words, # Generate up to 32 tokens, set to None to generate up to the end of the context window
    stream=True)
    loops = num_words
    
    for item in output:
        loops -= 2
        bit = item['choices'][0]['text']
        returned_text += f"{bit}"
        print(returned_text)
        if loops <= 0:
            return returned_text

    '''
    current_textbox_in_use = output1
    
    
    step += 1
    
    for item in output:
        bit = item['choices'][0]['text']
        if step == 1:
            output1.insert("end", bit)
        elif step == 2:
            output2.insert("end", bit)
        elif step == 3:
            output3.insert("end", bit)
    print(output)
    
    
    if step <= 3: 
        print('End of processing. On step:')
        print({step})
        llm_function()
    else:
        print('End of processing. Final processing step finished.')
        step = step - 3
        print('Step:')
        print({step})
        '''
