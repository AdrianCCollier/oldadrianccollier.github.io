import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2">
      <div className="container">
        <a href="../FIXME" className="navbar-brand">Spotify Fancyffffff Audio Visualizer</a>

    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu"></div>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a href="index.html" className="nav-link">Home</a>
          </li>

          <li className="nav-item">
            <a href="#aboutme" className="nav-link">About Me</a>
          </li>

          <li className="nav-item">
            <a href="#Resume" className="nav-link">Resume</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
