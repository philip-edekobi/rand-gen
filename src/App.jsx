import {Flex, Text, useInterval} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App () {
  const [num, setNum] = useState (0);
  const [mouseX, setMouseX] = useState (0);
  const [mouseY, setMouseY] = useState (0);
  const [iss, setIss] = useState ({lat: 0, lon: 0});
  const [time, setTime] = useState (0);

  useEffect (() => {
    const currTime = new Date ().getTime ();

    setTime (currTime);

    setISSLocation ();

    document.onmousemove = e => {
      setMouseX (e.clientX);
      setMouseY (e.clientY);
    };

    // const locInterval = setInterval (() => {
    //   setISSLocation ();
    // }, 3000);

    // const randInterval = setInterval (() => {
    //   updateRand ();
    // }, 5000);

    return () => {
      // clearInterval (timeInterval);
      // clearInterval (locInterval);
      // clearInterval (randInterval);
    };
  }, []);

  useInterval (() => {
    const currTime = new Date ().getTime ();

    setTime (currTime);
  }, 1000);

  useInterval (() => {
    setISSLocation ();
  }, 3300);

  useInterval (() => {
    updateRand ();
  }, 3000);

  async function setISSLocation () {
    const resp = await axios.get ('http://api.open-notify.org/iss-now.json');
    const data = await resp.data['iss_position'];

    setIss ({lon: data.longitude, lat: data.latitude});
  }

  function updateRand () {
    const mouseVar = mouseX * mouseY;
    const issVar = Math.abs (iss.lat * iss.lon);
    const seed = (mouseVar + issVar) / lastSixDigitsOfTime ();

    const newNum = Math.floor (seed * Math.random () * 1000);

    setNum (newNum);
  }

  function lastSixDigitsOfTime () {
    const strn = time.toString ().slice (-7);

    return parseInt (strn, 10);
  }

  return (
    <Flex flexDir="column" w="100vw" pt="4rem">
      <Flex mb="8" align="center" justify="center" w="100vw" flexDir="column">
        <Text fontSize="x-large" fontWeight="600">
          Random Number(btw 0 and 99):
        </Text>

        <br />

        <Text color="red" fontSize="x-large" fontWeight="700">{num}</Text>
      </Flex>

      <Flex flexDir="column" px="6">
        <Text>Mouse Position(x, y): {mouseX}, {mouseY}</Text>
        <Text>ISS Location(lat, lon): {iss.lat}, {iss.lon}</Text>
        <Text>Current UTC Time: {time}</Text>
      </Flex>

    </Flex>
  );
}

export default App;
