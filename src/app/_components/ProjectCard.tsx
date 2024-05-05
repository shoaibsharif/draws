"use client";
import { Button, Menu, Paper, Text, Title } from "@mantine/core";
import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { TbDotsVertical } from "react-icons/tb";

interface Prop {
  project: Project;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

const ProjectCard: React.FC<Prop> = ({
  project,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <Paper withBorder p={"md"} className="relative">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button className="absolute right-5 mt-2">
            <TbDotsVertical />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={onClickEdit}>Edit</Menu.Item>
          <Menu.Item onClick={onClickDelete}>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Link href={`/${project.id}/boards`}>
        <div className="flex items-start justify-between">
          <Title order={4}>{project.name}</Title>
        </div>
        <Text>{project?.description}</Text>
      </Link>
    </Paper>
  );
};

export default ProjectCard;
