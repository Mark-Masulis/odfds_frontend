import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import TabBar from "./../Components/TabBar";
import RestaurantHomePage
 from "./RestaurantHomePage";
export default function Restaurant(props) {
  const { userType } = useParams();
  const [userTab, setUserTab] = useState(userType || "create");
  return (
    <div>
      <TabBar
        tabs={[
          {
            label: "Create",
            onSelect: () => {
              setUserTab("create");
            },
          },
          { label: "History",
          onSelect: () => {
            setUserTab("order history");
          }, },
        ]}
        defaultLabel={userType}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={(() => {
            switch (userTab) {
              case "create":
                return <RestaurantHomePage />;
            }
            
          })()}
        />
      </Routes>
    </div>
  );
}

