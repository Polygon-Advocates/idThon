import os
import requests
import json
import math
import random

from io import BytesIO
from PIL import Image
from base64 import b64encode
from dotenv import dotenv_values

config = dotenv_values(".env")  # config = {"USER": "foo", "EMAIL": "foo@example.org"}

health_dic = {
    "dead": "dying, dead, deathly",
    "sick": "drained, tired, sad, hungry, starving",
    "healthy": "lush, lively, healthy, excited, energetic",
}
element_dic = {
    "WATER": {"prompt": "water ocean aqua clear blue", "negativePrompt": "white"},
    "EARTH": {
        "prompt": "ground soil earth dirt brown",
        "negativePrompt": "red yellow",
    },
    "FIRE": {"prompt": "flames inferno blaze fire red", "negativePrompt": "yellow"},
    "AIR": {"prompt": "sky breeze cloud wind air orange", "negativePrompt": "blue sun"},
}
creatures_dic = {
    "WATER": {
        "dragonfly": {"template": "assets/creatures/dragonfly.jpeg", "id": 1},
        # "water_strider": {"template": "assets/creatures/water_strider.jpeg", "id": 2},
        # "water_scorpion": {"template": "assets/creatures/water_scorpion.png", "id": 3},
        # "boatman": {"template": "assets/creatures/boatman2.webp", "id": 4},
    },
    "EARTH": {
        # "earthworm": {"template": "assets/creatures/earthworm.jpeg", "id": 5},
        # "millipede": {"template": "assets/creatures/millipede2.jpeg", "id": 6},
        "rolypoly": {"template": "assets/creatures/rolypoly.jpeg", "id": 7},
        # "ant": {"template": "assets/creatures/ant2.png", "id": 8},
        # "cricket": {"template": "assets/creatures/cricket.jpeg", "id": 9},
    },
    "FIRE": {
        # "fire_ant": {"template": "assets/creatures/fire_ant.webp", "id": 10},
        "black_widow": {"template": "assets/creatures/black_widow.webp", "id": 11},
        # "firefly": {"template": "assets/creatures/firefly.jpeg", "id": 12},
        #  "pincher_bug": {"template": "assets/creatures/pincher_bug.webp", "id": 13},
    },
    "AIR": {
        # "bee": {"template": "assets/creatures/bee2.png", "id": 14},
        # "dune_beetle": {"template": "assets/creatures/beetle2.jpeg", "id": 15},
        "butterfly": {"template": "assets/creatures/butterfly3.jpeg", "id": 16},
        # "ladybug": {"template": "assets/creatures/ladybug.jpeg", "id": 17},
    },
    "dragonfly": {"template": "assets/creatures/dragonfly.png", "id": 1},
    "ant": {"template": "assets/creatures/ant.png", "id": 8},
    "butterfly": {"template": "assets/creatures/butterfly.png", "id": 18},
}

GENERATOR_GPU_URL = os.environ.get("GENERATOR_GPU_URL", "htttp://localhost:7879")
ENCODING = "utf-8"


# stable diffusion
# this is subject to change so maybe use kwargs
async def generate_creature_route(plant, element, cached=True):
    # creature randomizer
    this_element = element_dic[element]
    this_creature_set = creatures_dic[element]
    this_creature = random.choice(list(this_creature_set.keys()))

    if cached == False:
        url = GENERATOR_GPU_URL + "/sdapi/v1/txt2img"
        with open(this_creature_set[this_creature]["template"], "rb") as image_file:
            byte_content = image_file.read()

        base64_bytes = b64encode(byte_content)
        base64_string = base64_bytes.decode(ENCODING)

        # TODO: Update the prompt grae
        dics = {
            # 512 by 512 is cheaper but not sd2
            # This is probably the most editable line (needs some work)
            # Some of these prompts are going to cause copyright issues if not filtered
            "prompt": "a (kanto) anime (avatar the last airbender) (anthropomorphic) (((cute))) (insect) "
            + plant
            + " "
            + "textured wings and shell with"
            + " "
            + this_element["prompt"]
            + " ",
            "negative_prompt": "((girl)) ((person)) ((human))"
            + this_element["negativePrompt"],
            "seed": -1,
            "subseed": -1,
            "subseed_strength": 0,
            "batch_size": 1,
            "n_iter": 1,
            "steps": 20,
            "cfg_scale": 7,
            "width": 512,
            "height": 512,
            "restore_faces": True,
            "eta": 0,
            "sampler_index": "Euler a",
            "alwayson_scripts": {
                "controlnet": {
                    "args": [
                        {
                            "input_image": base64_string,
                            "module": "depth_midas",
                            "model": "control_sd15_seg [fef5e48e]",
                            "weight": 2,
                            "guidance": 1,
                            "mask": "",
                            "resize_mode": "Crop and Resize",
                            "lowvram": False,
                            # "processor_res": 64,
                            # "threshold_a": 64,
                            # "threshold_b": 64,
                            "guidance_start": 0,
                            "guidance_end": 1,
                            # "guessmode": True,
                            # "pixel_perfect": False
                        }
                    ]
                }
            },
        }
        # the json above should be captured somewhere
        x = requests.post(url, json=dics)
        img1 = json.loads(x.text)["images"][0]
        # saving image
        # im = Image.open(BytesIO(base64.b64decode(img1)))
        # im.save(args.outdir + file.stem + ".png", 'PNG')

        return img1
