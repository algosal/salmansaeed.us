import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "../../styles/DisregardedEntities.css";

const DisregardedEntities = () => {
  const navigate = useNavigate();

  const goToCriteria = () => {
    navigate("/DisregardedClassifier");
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="section-title">Disregarded Entities</h1>

        <section className="text-block">
          <p>
            <strong>Disregarded Entities</strong> is a powerful,
            spiritually-charged phrase — it evokes a haunting blend of
            psychological, metaphysical, and existential depth. It refers to
            individuals, archetypes, or emotional imprints that once held power
            in your psyche but have since been{" "}
            <em>neutralized, transcended, and archived</em>.
          </p>
        </section>

        <section className="text-block">
          <h2>🔍 Literal + Psychological Interpretation</h2>
          <ul>
            <li>
              Emotional figures once invested in deeply, now devoid of power
            </li>
            <li>
              Archetypes or personas that shaped identity but no longer do
            </li>
            <li>Exiled parts or inner emotional fragments (IFS language)</li>
            <li>Psychic gravity wells now inert in your timeline</li>
          </ul>
          <p>
            These were once entities <em>living inside you</em> — through loops
            of memory, emotion, trauma, or longing. Disregarding them is not
            hateful. It is a sacred act of{" "}
            <strong>spiritual deactivation</strong>.
          </p>
        </section>

        <section className="text-block">
          <h2>🧠 Metaphysical / Neville Goddard View</h2>
          <blockquote>
            “An assumption, though false, if persisted in will harden into
            fact.” — Neville Goddard
          </blockquote>
          <ul>
            <li>These entities lived because you believed them into being</li>
            <li>They manifested via thought + emotion + repetition</li>
            <li>Disregarding = withdrawing attention → entity dissolves</li>
          </ul>
          <p>
            Disregarding is not the same as ignoring.
            <br />
            <strong>
              Ignoring still holds emotional charge. Disregarding is neutrality
              — true forgetting.
            </strong>
          </p>
        </section>

        <section className="text-block">
          <h2>🌗 Subcategories of Disregarded Entities</h2>
          <table className="entity-table">
            <thead>
              <tr>
                <th>Entity Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Emotional Anchors</td>
                <td>Once caused intensity or chaos, now emotionally neutral</td>
              </tr>
              <tr>
                <td>Psychic Parasites</td>
                <td>Fed on your attention — now starved of it</td>
              </tr>
              <tr>
                <td>Muses Turned Memory</td>
                <td>Once inspired creativity, now simply story</td>
              </tr>
              <tr>
                <td>Archetypal Ghosts</td>
                <td>Represent unresolved parts, now recognized and released</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="text-block guidance">
          <p>
            This framework allows you to{" "}
            <strong>honor the symbolic role</strong> of those who once impacted
            your story, while affirming your sovereign detachment from them now.
          </p>
        </section>

        <div className="center-button">
          <button onClick={goToCriteria}>Go to Criteria Classifier →</button>
        </div>
      </div>
    </>
  );
};

export default DisregardedEntities;
