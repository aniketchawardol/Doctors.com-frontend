const fetchHospitalData = async () => {
  try {
    let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/hospitals/current-hospital`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const responsedata = await response.json();
      console.log("login successfull", responsedata.data);
      return responsedata.data;
    }

    const refreshResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/hospitals/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      console.log("No hospital logged in");
      return null;
    }

    response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/hospitals/current-hospital`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const responsedata = await response.json();
      console.log("login successfull", responsedata.data);
      return responsedata.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching hospital data:", error.message);
    return null;
  }
};

export default fetchHospitalData;