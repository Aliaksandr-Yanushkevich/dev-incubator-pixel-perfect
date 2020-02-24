import './styles/reset.scss';
import './styles/header.scss';
import './styles/main.scss';
import './styles/about-us.scss';
import './styles/works.scss';
import './styles/team.scss';
import './styles/contacts.scss';
import './styles/footer.scss';

window.onload = function () {
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption

    const container = document.querySelector('.items');
    const modalImg = document.getElementById("img1");
    container.onclick = function (e) {
        const selectedImg = e.target.closest('img');
        if (selectedImg) {
            modal.style.display = "block";
            modalImg.src = selectedImg.src;
        }
        
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}
