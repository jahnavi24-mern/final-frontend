import "./Footer.css";

const Downloads = () => {
  return (
    <div className="download-container">
            <div>
              <img src="../apple.svg" alt="Apple icon" />
              <div>
                <p>Download on the</p>
                <p className="app-name">App Store</p>
              </div>
            </div>
            <div>
              <img src="../google-play.svg" alt="Google play icon" />
              <div>
                <p>GET IT ON THE</p>
                <p className="app-name">Google Play</p>
              </div>
            </div>
          </div>
  )
}

const Footer = () => {

  return (
    <footer className="footer">
      <div className="container">
        <div className="sub-1">
          <img src="../logo-2.svg" alt="Logo" className="logo"/>
          <Downloads />
          <p>Company # 490039-445, Registered with House of companies.</p>
        </div>



        <div className="sub-2">
          <p className="sub-2-title">Get Exclusive Deals in your Inbox</p>

          <div className="email-container">
            <input placeholder="youremail@gmail.com"></input>
            <button>Subscribe</button>
          </div>


          <p className="email-policy">we wont spam, read our email policy</p>

          <div>
            <img src="../Facebook.svg" alt="Facebook" />
            <img src="../Instagram.svg" alt="Instagram" />
            <img src="../TikTok.svg" alt="TikTok" />
            <img src="../Snapchat.svg" alt="Snapchat" />
          </div>
        </div>


        <div className="sub-3">
          <p className="sub-3-title">Legal Pages</p>
          <a href="" className="link">Terms & Conditions</a>
          <a href="" className="link">Privacy</a>
          <a href="" className="link">Cookies</a>
          <a href="" className="link">Modern Slavery Statement</a>
        </div>

        <div className="sub-4">
          <p className="sub-4-title">Important Links</p>
          <a href="" className="link">Get help</a>
          <a href="" className="link">Add your restaurant</a>
          <a href="" className="link">Sign up to deliver</a>
          <a href="" className="link">Create a business account</a>
        </div>


        {/* <div className="links">
          <a href="/about" className="link">
            About Us
          </a>
          <a href="/contact" className="link">
            Contact Us
          </a>
          <a href="/privacy" className="link">
            Privacy Policy
          </a>
          <a href="/terms" className="link">
            Terms of Service
          </a>

          <p className="text">
            &copy; {new Date().getFullYear()} Foodie Express. All rights reserved.
          </p>
        </div> */}
      </div>

      <div className="copyright">
        <div className="copyright-container">
          <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        </div>

        <div className="socials">
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>Pricing</p>
          <p>Do not sell or share my personal information</p>
        </div>
      </div>
    </footer>
  )
};

export {Footer, Downloads};