function toggleHiddenCheckbox() {
                var interests = document.querySelectorAll('input[name^="option"]:checked');
                var hiddenCheckbox = document.getElementById('hidden-checkbox');
                var errorMessage = document.getElementById("error-message");

                if (interests.length === 0) {
                    
                    errorMessage.style.display = 'block';

                } else {
                    errorMessage.style.display = 'none';
                }
            }

        function getFormData(event) {
            event.preventDefault(); // Prevent form submission

            var formData = {
                access_key: 'ff4e37a4-90c5-438b-af3b-31c8f2ffb75a',
                from_name: 'Compassionate Gentle Home',
                subject: 'New form submission',
                from: document.getElementById('email').value,
                Name: document.getElementById('first-name').value + " " + document.getElementById('last-name').value,
                Phone: document.getElementById('phone').value,
                Email: document.getElementById('email').value,
                Interested_in_services: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(function(checkbox) {
                    return '- ' + checkbox.nextElementSibling.textContent.trim(); // Prepend '-' to each item
                }).join('\n'),
                Zip_Code: document.getElementById('zip-code').value,
                Heard_about_us_from: document.getElementById('hear-us').value,
                Care_Duration_Required: document.getElementById('comments').value
            };
            console.log(formData);
            sendFormToWeb3Forms(formData); // Send form data
        }
        function showPopup() {
            document.getElementById('popup').style.display = 'block';
            document.getElementById('popup').classList.add('visible');
            document.getElementById('pricing-form').style.opacity = 0.5;
        }
    
        // Function to close the popup
        function closePopup() {
            document.getElementById('popup').classList.remove('visible');
            document.getElementById('popup').style.display = 'none';
            document.getElementById('pricing-form').style.opacity = 1;
        }

        function sendFormToWeb3Forms(formData) {
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showPopup();
                } else {
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
