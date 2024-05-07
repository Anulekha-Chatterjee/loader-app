export async function fetchData(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
              // Fetch data from an API endpoint
              const response = await fetch(url);

              if (!response.ok) {
                  throw new Error("Failed to fetch data");
              }

              const jsonData = await response.json();
              resolve(jsonData);
          } catch (error) {
              console.error("Error fetching data:", error);
              reject(error);
          }
      }, 3000); // 3-second timeout
  });
}
