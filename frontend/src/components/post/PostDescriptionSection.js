import React, { useEffect, useState } from "react";
import styles from "../../css/post/postDescriptionSection.module.css";

const PostDescriptionSection = ({ title, description }) => {
  const [shortDescription, setShortDescription] = useState(null);
  const [isLong, setIsLong] = useState(false);

  const isTooLong = (text) => {
    return text !== undefined && text.split(" ").length > 30;
  };

  const checkDescriptionLength = () => {
    if (isTooLong(description)) {
      setShortDescription(description.split(" ").slice(0, 30).join(" "));
    }
  };

  useEffect(() => {
    checkDescriptionLength();
  }, []);

  return (
    <div className={styles.postDescriptionContainer}>
      <h3 className={styles.descriptionTitle}>{title}</h3>
      {!shortDescription ? (
        <div>
          <p className={styles.descriptionContainer}>{description}</p>
        </div>
      ) : (
        <div>
          <p className={styles.descriptionContainer}>
            {isLong ? description : shortDescription}
            <span onClick={() => setIsLong(!isLong)}>
              <strong style={{ cursor: "pointer" }}>
                {isLong ? " Show less." : "... Show More."}
              </strong>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PostDescriptionSection;
