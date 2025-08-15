import gradio as gr
gr.load_chat("http://localhost:8000/v1/", 
             model="Qwen/Qwen2-0.5B-Instruct", 
             token="").launch()