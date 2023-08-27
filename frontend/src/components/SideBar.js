import {React, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import classNames from "classnames";
import '../App.css'
import { LinkContainer } from 'react-router-bootstrap';
const SideBar = ({ user, toggle, isOpen  }) => {
  return (
    <>
     <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header ">
          <Button
            variant="link"
            onClick={toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <i class="bi bi-x-lg"></i>
          </Button>
            <Image fluid  src={'/logo.png'} width={100} height={100} />
        </div>
              <Nav  className="flex-column pt-2">
                {user.userType === 'STUDENT' ? (
                  <>
                    <Nav.Item className="m-4 " >
                      <LinkContainer to="/">
                        <Nav.Link className="text-light "><i class="bi bi-house-door-fill"></i> {''}Homepage</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/intern/info">
                        <Nav.Link className="text-light"><i class="bi bi-check-circle-fill"></i>{' '}Internship Information</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/report">
                        <Nav.Link className="text-light"><i class="bi bi-file-earmark-arrow-up-fill"></i>{' '}Reports</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/attendance">
                        <Nav.Link className="text-light">
                        <i class="bi bi-calendar-check-fill"></i>{' '}  Attendance Reports
                        </Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/register">
                        <Nav.Link className="text-light">
                        <i class="bi bi-file-earmark-plus-fill"></i>{' '}Internship Registration Reports
                        </Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/intern">
                        <Nav.Link className="text-light"><i class="bi bi-info-circle-fill"></i>{' '}Internship Registration</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/profile">
                        <Nav.Link className="text-light"><i class="bi bi-person-vcard-fill"></i>{' '}Profile</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  </>
                ) : (
                  <>
                    {user.userType === 'ACADEMIC' ? (
                      <>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/">
                            <Nav.Link className="text-light"><i class="bi bi-house-door-fill"></i> {' '} Homepage</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/studentInfo">
                            <Nav.Link className="text-light"><i class="bi bi-people-fill"></i>
                                {''} Student Information
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/intern/confirm">
                            <Nav.Link className="text-light">
                            <i class="bi bi-check-circle-fill"></i>{' '}Internship Approval
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/companyInfo">
                            <Nav.Link className="text-light">
                            <i class="bi bi-buildings-fill"></i>{' '}Company Information
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/report/list">
                            <Nav.Link className="text-light"><i class="bi bi-file-earmark-fill"></i>{' '}Reports</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/attendance/list">
                            <Nav.Link className="text-light"><i class="bi bi-calendar-check-fill"></i>{' '}
                              Attendance Reports
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/register/list">
                            <Nav.Link className="text-light"><i class="bi bi-file-earmark-text-fill"></i>{' '}
                              Registration Reports
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/academic">
                            <Nav.Link className="text-light"><i class="bi bi-cloud-plus-fill"></i> {' '}
                              Create File Upload Area
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/assignment">
                            <Nav.Link className="text-light"><i class="bi bi-archive-fill"></i>{' '}
                             Uploads
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/surveyInfo">
                            <Nav.Link className="text-light"><i class="bi bi-ui-checks-grid"></i>{' '}
                              View Surveys
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/announcement/create">
                            <Nav.Link className="text-light">
                            <i class="bi bi-megaphone-fill"></i>{' '}Create Announcement
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                      </>
                    ) : (
                      <> 
                        {user.userType === 'ADMIN' ? (
                      <> 
                      <Nav.Item className="m-4">
                          <LinkContainer to="/">
                            <Nav.Link className="text-light"><i class="bi bi-house-door-fill"></i>{' '} Homepage</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                      <LinkContainer to="/admin">
                        <Nav.Link className="text-light"><i class="bi bi-person-fill-add"></i>{' '}Class Assignment</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item className="m-4">
                      <LinkContainer to="/admin/class">
                        <Nav.Link className="text-light"><i class="bi bi-people-fill"></i>{' '}Classes</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                       </>) :
                       <>
                       <Nav.Item className="m-4">
                          <LinkContainer to="/">
                            <Nav.Link className="text-light"><i class="bi bi-house-door-fill"></i>{' '}Homepage</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="m-4">
                          <LinkContainer to="/companyForm">
                            <Nav.Link className="text-light">
                            <i class="bi bi-ui-checks-grid"></i>{' '} Company Form
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                       </>}
                      </>
                    )}
                  </>
                )}
              </Nav>
              </div>
    </>
  );
};

export default SideBar;
