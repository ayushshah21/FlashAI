import React, { useEffect, useState } from "react";
import axios from "axios";

interface inputProps {
    input: string;
}

const RetreiveData: React.FC<inputProps> = ({input}) => {
const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Trying");
    const apiUrl = "https://uwtgx3k0v9.execute-api.us-east-1.amazonaws.com/dev";
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(apiUrl, {
            params: {input},
        });
        console.log(response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };
    fetchData();
  }, []);
  

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h2>Flashcards Preview</h2>
          {data}
        </div>
      )}
    </div>
  );
};

export default RetreiveData;
