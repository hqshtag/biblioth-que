import React from "react";

const TabButton = ({ Icon, title, active, dataKey, switchTab }) => {
  const tabclass = active ? "tab-button active" : "tab-button";
  // console.log(dataKey);
  return (
    <span className={tabclass}>
      <Icon active={active} />
      <h3
        data-key={dataKey}
        onClick={(e) => {
          switchTab(e);
        }}
      >
        {title}
      </h3>
    </span>
  );
};

export default TabButton;
