import React from 'react';
import { HeroSection, Card } from '/src/components/ui'

const NoPage = () => {
  return (
    <>
      <HeroSection>
        <Card>
          <Card.Title>
            404
          </Card.Title>

          <Card.Section>
            <p className='text-xl'>You're lost! This page doesn't exist!</p>
          </Card.Section>
        </Card>
      </HeroSection>
    </>
  )
}

export default NoPage;