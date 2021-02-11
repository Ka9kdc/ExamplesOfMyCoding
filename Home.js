import React from 'react'

const Home = () => {
    return (
        <>
          <div className="Title">WCRA's Home On The Web - W9CCU</div>
          <div className="Content">
            <div>
              <h1>At First Glance</h1>

              <p>
                <b>Wheaton Community Radio Amateurs, Inc.</b> was founded in
                1948. We are a group of amateur radio operators who promote the
                advancement of the hobby and science of amateur radio through
              </p>

              <ul>
                <li>
                  member participation in training and testing of new amateur
                  operators;
                </li>
                <li>
                  providing local communications infrastructure via repeaters;
                </li>
                <li>
                  supporting local emergency services with secondary
                  communications;
                </li>
                <li>
                  and offering communications support for many local charitable
                  and social groups.
                </li>
              </ul>

              <p>
                WCRA is involved in all facets of Amateur Radio, supporting the
                healthy growth of the hobby through diversification and
                participation. If this sounds like a group you'd be interested
                in joining, then come to one of our events or meetings and see
                what kind of folks we really are.
              </p>
            </div>
            <div>
              <h1>Our Mission Statement</h1>

              <p
                style={{
                  padding: '0.5em 2em 0.5em 2em',
                  backgroundColor: '#F0F0F0',
                  maxWidth: '40%',
                  border: '1px solid black',
                }}
              >
                The mission of the Wheaton Community Radio Amateurs is to
                further the art of radio communications and electronics by
                mentoring anyone with like interests, participating in community
                events, preparedness in assisting in the event of a disaster
                where other communication modes can fail, while promoting social
                camaraderie among its members.
              </p>
            </div>
          </div>
        </>
    )
}

export default Home