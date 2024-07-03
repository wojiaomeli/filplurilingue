import { useEffect } from 'react';

export const AutoWriteText = () => {
    useEffect(() => {
        console.log('AutoWriteText called'); // Log when the function is called
        const element = document.querySelector('[data-fv-anim="autowrite"]');
        if (element) {
            const text = element.getAttribute('data-fv-data');
            console.log('Animating text:', text); // Log the text to be animated
            element.innerHTML = ''; // Clear the element's inner HTML before starting
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    const currentText = element.textContent;
                    if (currentText.charAt(currentText.length - 1) !== text.charAt(index)) {
                        element.innerHTML += text.charAt(index);
                    }
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 100); // Adjust the speed of the writing here if necessary

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, []); // Empty dependency array ensures useEffect runs only once after initial render
    return null; // AutoWriteText does not render any visible content
};
