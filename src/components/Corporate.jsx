import React from "react";
import { NavLink } from "react-router-dom";

const Corporate = () => {
  return (
    <div className="container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Meet Salman
        </NavLink>
        <NavLink
          to="/corporate"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Corporate
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Gallery
        </NavLink>
      </nav>

      {/* Main content */}
      <div className="content">
        <header className="content-header">
          <h1>Corporate Structure</h1>
        </header>

        {/* Margin top to offset fixed header height */}
        <div style={{ marginTop: 120 }}>
          {/* Your Company components here */}
          <Company
            title="FinSln Holdings"
            description="Main holding company that owns all subsidiaries."
            subCompanies={[
              {
                title: "FinSln LLC",
                description:
                  "Financial and accounting solutions across industries.",
              },
              {
                title: "FinPwr LLC",
                description: "Hedge fund and financial leverage operations.",
              },
            ]}
          />

          <Company
            title="Conscience Neurons LLC"
            description="Neural Networks and AI systems integration."
          />

          <Company
            title="Mellow Enclave LLC"
            description="The Billionaires Club: Lifestyle and high net-worth network."
          />

          <Company
            title="Suit De Vital LLC"
            description="Elite custom suiting brand for professionals."
          />

          <Company
            title="THC & Wellness Division"
            subCompanies={[
              {
                title: "Budson Valley Smokehouse",
                description: "THC Dispensary.",
              },
              { title: "420 CannaCore LLC", description: "THC Dispensary." },
              { title: "Floating Koala LLC", description: "THC Dispensary." },
              {
                title: "Wellness & Beyond",
                description: "Wellness product line (Sole Proprietorship).",
              },
            ]}
          />

          <Company
            title="Alba Gold Systems LLC"
            description="Core software development company."
            subCompanies={[
              {
                title: "Alba Points LLC",
                description: "Blockchain-style point system for AG App/token.",
              },
            ]}
          />

          <Company
            title="Data & Retail Ops Division"
            subCompanies={[
              {
                title: "Savvy Inventory LLC",
                description:
                  "Retail inventory management and POS optimization tools.",
              },
              {
                title: "Financial Data LLC",
                description:
                  "Analytics, dashboards, and reporting systems for decision-making.",
              },
            ]}
          />

          <Company
            title="Mergers and Acquisitions for Salman Saeed LLC"
            description="Corporate expansion and business acquisitions engine."
          />

          <Company
            title="Salman Saeed Corporate Solutions"
            description="Original entity, IPO-oriented (Sole Proprietorship)."
          />
        </div>
      </div>

      {/* You can keep your responsive style overrides here if needed */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
          .content {
            margin-left: 0 !important;
            padding: 20px 15px !important;
            margin-top: 60px;
          }
          .content-header {
            left: 0 !important;
            width: 100% !important;
            top: 75px !important;
            position: fixed !important;
            padding: 10px 15px !important;
            background-color: #000 !important;
            border-bottom: 1px solid #333 !important;
            z-index: 10 !important;
          }
          .content-header h1 {
            font-size: 2rem !important;
            margin: 0 !important;
            color: #ffcc00 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Corporate;

const Company = ({ title, description, subCompanies }) => (
  <div className="company">
    <h3>{title}</h3>
    <p>{description}</p>
    {subCompanies && (
      <div className="sub-list">
        {subCompanies.map((sub, i) => (
          <Company key={i} {...sub} />
        ))}
      </div>
    )}
  </div>
);
