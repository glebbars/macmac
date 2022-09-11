import * as React from "react";
import { forwardRef } from "react";

const CustomLogOutBtn = forwardRef((props, ref) => {
  return (
    <div
      className="admin__logout-btn"
      onClick={() => {
        localStorage.removeItem("macmac-username");
        window.location.replace("/");
      }}
    >
      Logout
    </div>
  );
});

export default CustomLogOutBtn;
