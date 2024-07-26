import React, { useState } from "react";

const useAuth = (Wrapper, allowedRoles) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (props) => {
    const { role } = props;

    if (true) {
      if (allowedRoles.includes(role)) {
        return (
          <>
            <Wrapper {...props} />
          </>
        );
      }
    } else {
      return <div>useAuth</div>;
    }
  };
};

export default useAuth;
