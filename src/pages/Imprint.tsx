'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Imprint = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
        <h1>IMPRINT //</h1>

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to David Fischer&apos;s personal portfolio website. As a software engineer and an all-around solution
            finder, this website aims to showcase my professional background, interests in deep learning, game
            engineering, data science, and my work in the field of AI and Machine Learning at the University of Applied
            Sciences Kempten.
          </p>
          <p>
            This page describes what data is involved when you visit this website and the applications operated under
            its subdomains, and how that data is handled. It is a notice about data processing and makes no claim to be
            legal advice.
          </p>
        </section>

        <section>
          <h2>Purpose of the Website</h2>
          <p>
            The website serves to present myself, David Fischer, to peers and individuals interested in my research or
            considering me for employment opportunities. It&apos;s a platform to highlight my academic and professional
            achievements, my passions, and to facilitate connections within the professional community.
          </p>
        </section>

        <section>
          <h2>Controller</h2>
          <p>
            The controller within the meaning of the General Data Protection Regulation (GDPR) for this website and for
            the applications operated under its subdomains is:
          </p>
          <p>David Fischer, Westendstraße 15, 87439 Kempten, Germany - theupsider@gmx.de</p>
        </section>

        <section>
          <h2>This Website</h2>
          <h3>Data Collection and Use:</h3>
          <p>
            The website itself has no contact forms, no user accounts, no newsletter, no analytics and no advertising.
            It does not build user profiles and does not track you across pages or across websites. The website serves
            its fonts and its page images from its own server rather than from an external font or image network.
          </p>
          <p>
            Like any website, this one still needs technical data in order to be delivered: the server answering your
            request processes your IP address, the requested address, the time of the request and the technical
            information your browser transmits (for example the user agent), so that the page can be sent to you and
            obvious abuse can be recognised. This connection data is not used to identify you personally and is not
            combined with other data.
          </p>
          <h3>External Content:</h3>
          <p>
            Videos on the media page are embedded from youtube-nocookie.com and are only loaded when you explicitly
            start playback. Until then no connection to YouTube is established. Once you start a video, YouTube (Google)
            is active as an independent provider and its own privacy policy applies.
          </p>
        </section>

        <section>
          <h2>Applications Under Subdomains</h2>
          <p>
            Individual applications are operated under subdomains of this domain (for example
            something.davidfischer.dev). What such an application does, and therefore which data it processes, depends
            on the application itself: an application may process data you enter, store files or state, or set its own
            technically necessary cookie.
          </p>
          <p>
            I remain the controller for these applications as well. Their purpose, scope and storage period follow from
            the respective application; where an application processes personal data, that application provides its own
            notice describing its data, purposes and retention.
          </p>
          <p>The applications run on my own hardware, and the data they process is stored there.</p>
        </section>

        <section>
          <h2>Access Protection</h2>
          <p>
            The applications under the subdomains are protected by HTTP Basic Authentication; a single shared
            credential, which I issue, protects them all. To open one of them you enter those credentials, and your
            browser then transmits them with every request to that application, encrypted over HTTPS. They are checked
            at the access layer in front of the application and are not passed on to the application itself. Requests
            without valid credentials are rejected and no application content is delivered.
          </p>
        </section>

        <section>
          <h2>Delivery, DNS and Edge Security</h2>
          <p>
            The DNS of this domain is operated through Cloudflare. Requests to the applications under the subdomains are
            delivered through Cloudflare as well: Cloudflare terminates the encrypted connection, forwards the request
            over an encrypted tunnel to my server and can apply security rules at its edge. For this, Cloudflare
            processes the connection data that is technically necessary - in particular your IP address, the requested
            address, the time of the request and technical request metadata.
          </p>
          <p>
            For these activities Cloudflare acts as a processor on my behalf within the meaning of Article 28 GDPR; the
            provider&apos;s data processing terms apply. Cloudflare is an international provider and may process data
            outside the European Union; such transfers are based on the EU standard contractual clauses.
          </p>
          <p>
            At its edge Cloudflare applies security rules that protect the service. These rules evaluate technical
            request data such as the connecting IP address. Cloudflare may also record technical diagnostic data about
            failed requests (network error reporting) and may set security cookies whose purpose is to distinguish
            automated traffic from real visitors.
          </p>
          <p>
            The website itself is served from a rented server of a hosting provider inside the European Union; the
            applications under the subdomains run on my own hardware.
          </p>
        </section>

        <section>
          <h2>Data Sharing</h2>
          <p>
            No data is sold, and no data is passed to third parties for their own purposes. Data is transmitted only
            where it is technically necessary to operate the service - in particular to the hosting provider and, for
            the subdomain applications, to Cloudflare as the delivery and security provider - or where the law requires
            it. This website uses no advertising, no analytics and no tracking; a subdomain application that processes
            data describes its own processing in its own notice.
          </p>
        </section>

        <section>
          <h2>Storage and Retention</h2>
          <p>
            Data processed by this website and by the applications under its subdomains is stored on servers that I
            control or that I rent, and only for as long as it is needed for the purpose it was collected for, or until
            you ask for it to be deleted, where no legal obligation requires a longer retention.
          </p>
        </section>

        <section>
          <h2>User Rights</h2>
          <p>
            Where personal data is processed, you have the rights of the GDPR, subject to the conditions of the
            respective provision: access (Article 15), rectification (Article 16), erasure (Article 17), restriction of
            processing (Article 18), data portability (Article 20) and objection to processing (Article 21). A consent
            you have given can be withdrawn at any time with effect for the future (Article 7(3)).
          </p>
          <p>
            You also have the right to lodge a complaint with a data protection supervisory authority (Article 77). The
            authority competent for me is the Bavarian data protection authority, Bayerisches Landesamt für
            Datenschutzaufsicht (BayLDA).
          </p>
          <p>For any of these rights, or for any question about this notice, please use the contact details below.</p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            All connections to this website and to the applications under its subdomains are encrypted with HTTPS. The
            applications are additionally protected by access credentials and are therefore not freely reachable. Only
            the data technically necessary for the respective function is processed, and it is kept on infrastructure
            that I control.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            For any questions or concerns regarding your privacy or this Privacy Policy, please contact David Fischer
            at:
          </p>
          <p>Email: theupsider@gmx.de</p>
          <p>Address: Westendstraße 15, 87439 Kempten, Germany</p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            I reserve the right to make changes to this Privacy Policy at any time. Such changes will be posted on this
            page and are effective immediately. This policy was last updated on 4 November 2026.
          </p>
          <p>By using this website, you acknowledge that you have read and understand this Privacy Policy.</p>
        </section>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Legal Information</h2>
        <p>This section provides a summary of the legal information for this website.</p>
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
          <h3>Key Points:</h3>
          <ul>
            <li>
              <strong>Owner and controller:</strong> David Fischer
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Address:</strong> Westendstraße 15, 87439 Kempten, Germany
            </li>
            <li>
              <strong>This website:</strong> no forms, no accounts, no analytics, no advertising, no tracking.
            </li>
            <li>
              <strong>Subdomain applications:</strong> may process and store their own data; each is protected by
              access credentials.
            </li>
            <li>
              <strong>Delivery and security:</strong> Cloudflare (DNS, encrypted delivery, edge security) as a
              processor; hosting inside the EU.
            </li>
            <li>
              <strong>Data sharing:</strong> no sale of data, no transfer for third-party purposes.
            </li>
          </ul>
        </div>
      </div>
    ),
    []
  )

  useEffect(() => {
    setUpperContent(upperContent)
    setLowerContent(lowerContent)

    return () => {
      setUpperContent(null)
      setLowerContent(null)
    }
  }, [upperContent, lowerContent, setUpperContent, setLowerContent])

  return null
}

export default Imprint
