from gradio_client import Client, handle_file
import gradio as gr
import os

HF_TOKEN = ""

client = Client("yisol/IDM-VTON", hf_token=HF_TOKEN)

def vton_generation(human_model_img: str, garment: str):
    """Use the IDM-VTON model to generate a new image of a person wearing a garment.
    
    Args:
        human_model_img: The human model that is modelling the garment.
        garment: The garment to wear.
    """
    try:
        print("Available APIs:", client.view_api())
        
        output = client.predict(
            dict={"background": handle_file(human_model_img), "layers":[], "composite":None},
            garm_img=handle_file(garment),
            garment_des="",
            is_checked=True,
            is_checked_crop=False,
            denoise_steps=30,
            seed=42,
            api_name="/tryon"
        )
        return output[0]
    except Exception as e:
        print(f"Error in virtual try-on: {e}")
        return None

vton_mcp = gr.Interface(
    vton_generation,
    inputs=[
        gr.Image(type="filepath", label="Human Model Image"),
        gr.Image(type="filepath", label="Garment Image")
    ],
    outputs=gr.Image(type="filepath", label="Generated Image"),
    title="Virtual Try-On MCP Server",
    description="AI-powered virtual clothing try-on"
)

if __name__ == "__main__":
    print("Starting Virtual Try-On MCP Server...")
    vton_mcp.launch(
        mcp_server=True,
        server_name="127.0.0.1",
        server_port=7860,
        share=False
    )