
const fetchLastAnnouncement = () => {
    return () => {
      fetch('/phpfiles/getRecentAnnoucements.php')
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        // Work with JSON data here
        console.log(data)
      })
      .catch((err) => {
        // Do something for an error here
        console.error(err);
      })
  
      // axios
      //   .get('/phpfiles/getRecentAnnoucements.php')
      //   .then((response) => {
      //     console.log("Annonce Res:", response)
      //     return response.data})
      //   .then((data) => console.log(data))
      //   .catch((error) => console.log(error));
      // try {
      //   console.log("last")
      //   const res = await ('phpfiles/getRecentAnnoucements.php');
      //  console.log("last res:", res)
      //   const announcement = await res.json()
      //   console.log("last data:", announcement)
      //   dispatch(setLastAnnouncment(announcement));
      // } catch (err) {
      //   console.error(err);
      // }
    };
  };
  console.log("hello")
  fetchLastAnnouncement()()
  console.log("goodbye")
