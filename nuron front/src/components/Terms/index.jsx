import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function Terms() {
  return (
    <section id="terms">
      <ul>
        <p>Welcome to Nuron’s Terms of Service page.</p>
        <p>
          By accessing or using the Nuron website and services, you agree to be
          bound by the following terms and conditions (the “Terms”). If you do
          not agree to these Terms, you may not access or use the Nuron website
          or services.
        </p>
        <li>NFTs</li>
        <p>
          Nuron is a platform for buying, selling, and trading non-fungible
          tokens (NFTs). NFTs are unique digital assets that are verified on the
          blockchain. By using Nuron, you acknowledge that you understand the
          risks associated with buying, selling, and trading NFTs.
        </p>
        <li>Account creation</li>
        <p>
          In order to use Nuron, you must create an account. You are responsible
          for maintaining the security of your account and should not share your
          account information with anyone else. Nuron is not responsible for any
          losses or damages that may result from unauthorized access to your
          account.
        </p>
        <li>Transactions</li>
        <p>
          When you buy, sell, or trade NFTs on Nuron, you are entering into a
          legal and binding agreement with the other party. Nuron is not a party
          to these transactions and is not responsible for any disputes that may
          arise.
        </p>
        <li>Fees</li>
        <p>
          Nuron charges a fee for certain transactions on the platform. These
          fees are clearly listed on the platform and are subject to change at
          any time.
        </p>
        <li>Cancellations and refunds</li>
        <p>
          All sales on Nuron are final. Nuron does not offer cancellations or
          refunds for any transactions.
        </p>
        <li>Prohibited activities</li>
        <p>
          You are prohibited from using Nuron for any illegal or fraudulent
          activities. Nuron may take action against any user who engages in such
          activities, including terminating their account and reporting them to
          the authorities.
        </p>
        <li>Intellectual property</li>
        <p>
          All content on the Nuron website, including but not limited to text,
          images, and code, is the property of Nuron or its licensors and is
          protected by copyright, trademark, and other intellectual property
          laws. You may not use any content from the Nuron website without
          express permission from Nuron or the appropriate licensor.
        </p>
        <li>Disclaimer of warranty</li>
        <p>
          Nuron provides the website and services “as is” and does not make any
          representations or warranties of any kind, express or implied, as to
          the operation of the website or the information, content, materials,
          or products included on the website.
        </p>
        <li>Limitation of liability</li>
        <p>
          In no event shall Nuron be liable for any damages whatsoever,
          including but not limited to any direct, indirect, special,
          incidental, or consequential damages, arising out of or in connection
          with the use or inability to use the Nuron website or services.
        </p>
        <li>Changes to the Terms</li>
        <p>
          Nuron reserves the right to make changes to these Terms at any time
          and without notice. Your continued use of the Nuron website and
          services following any changes to these Terms will be deemed your
          acceptance of those changes.
        </p>
        <li>Governing law</li>
        <p>
          These Terms and your use of the Nuron website and services shall be
          governed by and construed in accordance with the laws of the United
          States of America.
        </p>
        <li>Contact us</li>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at
          <Link to="mailto:nuron.nft@inbox.ru">nuron.nft@inbox.ru</Link>
        </p>
        <span>Thank you for using Nuron.</span>
      </ul>
    </section>
  );
}

export default Terms;
