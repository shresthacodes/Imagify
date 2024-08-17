# Text-to-Image Generation with Hugging Face API

This project allows you to generate AI-based images using the Hugging Face API. Enter a prompt, and it will generate six unique images based on the prompt, allowing you to download each one. 

## Features

- Generate 6 images based on a text prompt using Hugging Face's **Text-to-Image** model.
- Download the generated images.
- Responsive feedback with a **"Generating..."** message until all images are loaded.


## Demo

1. Enter a text prompt.
2. Click on the **Generate** button.
3. Wait for the "Generating..." message until all 6 images appear.
4. Download any image by clicking on the **Download** button.

## How to Use

1. **Set up Hugging Face API Token:**

    To use the Hugging Face API, you will need to generate an API token from Hugging Face.

    ### How to generate the API token:
    
    1. Go to [Hugging Face](https://huggingface.co/).
    2. Log in to your account or create a new one if you don’t have it.
    3. Navigate to your account settings and click on **API Tokens**.
    4. Generate a new token and copy it.
    5. Replace the `const token` in `index.js` with your token:
    
        ```javascript
        const token = "your_token_here";
        ```
# Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. **Fork the repository** to your own GitHub account.
2. **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature-name
    ```

3. **Make your changes** to the code.
4. **Commit your changes** with a descriptive commit message:

    ```bash
    git commit -m "Add feature: description"
    ```

5. **Push your changes** to your forked repository:

    ```bash
    git push origin feature-name
    ```

6. **Create a pull request** from your branch to the main repository, describing your changes and why they should be merged.

7. **Wait for the review and feedback** from the maintainers.

## License

This project is licensed under the MIT License.


