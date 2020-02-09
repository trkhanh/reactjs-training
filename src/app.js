import React, { Suspense, lazy } from "react";
import { Router, Link } from "@reach/router";

const chapters = [
  { name: "review" },
  { name: "context" },
  { name: "error-boundary" },
  { name: "hooks" },
  { name: "final" }
];


const Chapters = () => {
  return (
    <ul>
      {chapters.map(({ name }, idx) => {
        const id = ("0" + (idx + 1)).slice(-2);
        return (
          <Link key={id} to={`chapters/${id}-${name}`} className="chapter-link">
            <li className="chapter-item">
              <div className="chapter-title">{`${id} - ${name.toUpperCase()}`}</div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const TableOfContents = () => {
  return (
    <div className="home">
      <Chapters />
    </div>
  );
};

const Chapter = ({ name, ...props }) => {
  const Component = lazy(() => import(`./chapters/${name}`));
  return <Component {...props} />;
};

const TrainingApp = ({ children }) => {
  return <div className="training-app">{children}</div>;
};

export default function ReactTraining() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <TableOfContents path="/" />
          <TrainingApp path="chapters">
            <Chapter path=":name" />
          </TrainingApp>
        </Router>
      </Suspense>
    </>
  );
}
