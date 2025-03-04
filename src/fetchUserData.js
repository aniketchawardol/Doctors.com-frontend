// This function fetches the current user data from the server

const fetchUserData = async () => {
    try {
      let response = await fetch(` /api/v1/users/current-user`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const responsedata = await response.json();
        const data = responsedata.data;
        console.log(data);
        return data;
      } else {
        await fetch(` /api/v1/users/refresh-token`, {
          method: "POST",
          credentials: "include",
        });
        response = await fetch(` /api/v1/users/current-user`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const responsedata = await response.json();
          const data = responsedata.data;
          console.log(data);
          return data;
        } else {
          console.log("No user logged");
          return null;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
};

export default fetchUserData;