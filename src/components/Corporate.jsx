import React from "react";
import Navbar from "./Navbar";

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#121212",
  color: "#eee",
};

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 220,
  right: 0,
  backgroundColor: "#121212",
  color: "#ffcc00",
  borderBottom: "1px solid #333",
  padding: "15px 30px",
  fontSize: "2.5rem",
  fontWeight: "bold",
  zIndex: 150,
  height: 80,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
};

const contentStyle = {
  flexGrow: 1,
  padding: 30,
  marginTop: 80,
  maxWidth: "900px",
  marginLeft: "auto",
  marginRight: "auto",
};

const companyBlockStyle = {
  borderLeft: "4px solid #ffcc00",
  backgroundColor: "#1a1a1a",
  padding: "15px 20px",
  marginBottom: 20,
  boxShadow: "0 2px 6px rgba(255, 255, 255, 0.05)",
  textAlign: "left",
};

const subHeadingStyle = {
  color: "#ffcc00",
  fontSize: "1.3rem",
  marginBottom: 8,
};

const paragraphStyle = {
  fontSize: "1rem",
  lineHeight: "1.8",
  marginTop: "5px",
};

const Company = ({ title, description, subCompanies }) => (
  <div style={companyBlockStyle}>
    <h3 style={subHeadingStyle}>{title}</h3>
    {description && <p style={paragraphStyle}>{description}</p>}
    {subCompanies && (
      <div style={{ marginTop: 15, paddingLeft: 15 }}>
        {subCompanies.map((sub, i) => (
          <Company key={i} {...sub} />
        ))}
      </div>
    )}
  </div>
);

const Corporate = () => {
  return (
    <div style={containerStyle}>
      <Navbar />
      <header style={headerStyle}>Corporate Structure</header>

      <div className="content" style={contentStyle}>
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
          title="AG App"
          subCompanies={[
            {
              title: "Alba Gold Systems LLC",
              description: "Core software development company.",
            },
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

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
          header {
            position: fixed !important;
            top: 50px !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 15px 20px !important;
            font-size: 2rem !important;
            border-bottom: 1px solid #333 !important;
            z-index: 1500 !important;
            height: 60px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          .content {
            margin-left: 0 !important;
            margin-top: 110px !important;
            padding: 20px 15px !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Corporate;
