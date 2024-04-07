import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard from "../Nft-card/NftCard";
import { NFT__DATA } from "../../../assets/data/data.js";

import "./live-auction.css";

const LiveAuction = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h1
                style={{
                  background: "linear-gradient(to right, skyblue, purple)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Top Creations
              </h1>
              <span>
                <Link
                  to="/market"
                  style={{
                    background: "linear-gradient(to right, skyblue, purple)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textDecoration: "none",
                    fontWeight: "bold",
                    padding: "10px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(event) => {
                    event.target.style.WebkitTextFillColor = "snow";
                    event.target.style.textShadow =
                    "0 0 10px #800080, 0 0 20px #800080, 0 0 30px #800080, 0 0 40px #800080";
                  }}
                  onMouseOut={(event) => {
                    event.target.style.WebkitTextFillColor = "transparent";
                    event.target.style.textShadow = "none";
                  }}
                >
                  Explore more
                </Link>
              </span>
            </div>
          </Col>

          <Row style={{ display: "flex", alignItems: "stretch" }}>
            {NFT__DATA.filter((_, index) => [0, 1, 3].includes(index)).map(
              (item) => (
                // Your code here
                <Col lg="3.5" md="4" sm="6" className="mb-3">
                  <NftCard key={item.id} item={item} />
                </Col>
              )
            )}
          </Row>
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
