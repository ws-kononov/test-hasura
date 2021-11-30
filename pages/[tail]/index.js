import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styles from '../../styles/Home.module.css';
import { GET_DATA_BY_TAIL } from '../../graphql/queries/tail.query';

function TailPage() {

  const router = useRouter();
  const { tail } = router.query;
  const [tailData, setTailData] = useState({});
  const { loading, error, data } = useQuery(GET_DATA_BY_TAIL, { variables: { tail } });


  useEffect(() => {
    const getData = async () => {
        const result = await fetch('challenge.json');
        const json = await result.json();
        const itemFromJson = json.find(elem => elem.id == data.long_tails[0].json_id);
        setTailData(itemFromJson)
    };
    if (data) getData();
  }, [data]);

  if (error) return null;
  if (!data && !loading) return null;
  if (!data && loading) return <h2> Loading... </h2>;

  return (
    <div>
      <h1 className={styles.title}>
        Title: {tailData.title}
      </h1>

      <h2 className={styles.description}>
        Description: {tailData.description}
      </h2>
    </div>

  )
}

export default TailPage;