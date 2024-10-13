import '../css/footer.css'

export default function Footer() {
  return (
    <footer>
        <div className='footer-div1'>
            <div>
                <a href="">About Us</a>
                <a href="">Privacy Policy</a>
                <a href="">Terms & Conditions</a>
            </div>
            <div>
                <a href="">Refund Policy</a>
                <a href="">Shipping Policy</a>
                <a href="">Contact Us</a>
            </div>
            <div>
                <a href=""><i className="fa-solid fa-location-pin"></i> 16/1 Rohini Delhi-112642</a>
                <a href="">abcd@gmail.com</a>
                <a href="">+91 9958634750</a>
            </div>
        </div>
        <div className='Social-Media-Icons'>
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-twitter"></i>
            <i className="fa-brands fa-square-instagram"></i>
        </div>
        <p>E-commerce Pvt. Ltd © 2012 - 2024. All Rights Reserved.</p>
    </footer>
  )
}
