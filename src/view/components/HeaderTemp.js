import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header } from "components";
const ContentBig = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 16px;
  line-height: 1;
  h3,
  h4 {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 6px;
  }
  p {
    font-size: 32px;
  }
  ul {
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 14px auto 0;
    li {
      width: 50%;
      &:nth-child(n + 2) {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          height: 26px;
          width: 2px;
          background: #fff;
          opacity: 0.8;
          display: block;
          transform: translate(-50%, -50%);
        }
      }
    }
    p {
      font-size: 18px;
    }
  }
`;

const Content = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 16px;
  line-height: 1;
  h3 {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 6px;
  }
  p {
    font-size: 32px;
  }
`;
class HeaderTemp extends PureComponent {
  render() {
    const { small, title, count, subList } = this.props;
    if (small) {
      return (
        <Header defaultStyles={`margin-top: -66px; padding-top: 66px;`}>
          <Content>
            <h3>{title}</h3>
            <p>{count}</p>
          </Content>
        </Header>
      );
    }
    return (
      <Header>
        <ContentBig>
          <h3>{title}</h3>
          <p>{count}</p>
          <ul>
            {subList.map((ele, index) => (
              <li key={index}>
                <h4>{ele.title}</h4>
                <p>{ele.count}</p>
              </li>
            ))}
          </ul>
        </ContentBig>
      </Header>
    );
  }
}

HeaderTemp.propTypes = {
  small: PropTypes.bool,
  title: PropTypes.string,
  count: PropTypes.node,
  subList: PropTypes.array
};

export default HeaderTemp;
