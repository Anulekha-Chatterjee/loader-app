export async function fetchData(
  url: string,
  setData: Function,
  setLoading: Function
) {
  // Simulating a 3-second timeout using setTimeout to clearly show the loader
  setTimeout(() => {
    // Fetch data from an API endpoint
    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, 3000); // 3-second timeout
}
